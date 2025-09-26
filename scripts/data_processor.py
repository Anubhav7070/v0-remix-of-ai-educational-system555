import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import json
import sys
import warnings

warnings.filterwarnings("ignore")  # Suppress seaborn/matplotlib warnings

class DataProcessor:
    def __init__(self):
        self.data = None
        self.numeric_columns = []
        self.categorical_columns = []
        
    def load_data(self, file_path):
        """Load data from CSV file"""
        try:
            self.data = pd.read_csv(file_path)
            self._identify_column_types()
            print(f"✅ Data loaded successfully: {self.data.shape}")
            return True
        except Exception as e:
            print(f"❌ Error loading data: {e}")
            return False
    
    def _identify_column_types(self):
        """Identify numeric and categorical columns"""
        self.numeric_columns = self.data.select_dtypes(include=[np.number]).columns.tolist()
        self.categorical_columns = self.data.select_dtypes(include=['object']).columns.tolist()
    
    def generate_statistics(self):
        """Generate comprehensive statistics"""
        stats_report = {
            'basic_info': {
                'shape': self.data.shape,
                'columns': list(self.data.columns),
                'numeric_columns': self.numeric_columns,
                'categorical_columns': self.categorical_columns,
                'missing_values': self.data.isnull().sum().to_dict()
            },
            'numeric_stats': {},
            'categorical_stats': {}
        }
        
        # Numeric statistics
        if self.numeric_columns:
            numeric_stats = self.data[self.numeric_columns].describe(include='all')
            stats_report['numeric_stats'] = numeric_stats.to_dict()
            
            # Add correlation matrix
            correlation_matrix = self.data[self.numeric_columns].corr()
            stats_report['correlation_matrix'] = correlation_matrix.to_dict()
        
        # Categorical statistics
        for col in self.categorical_columns:
            value_counts = self.data[col].value_counts()
            stats_report['categorical_stats'][col] = {
                'unique_values': int(self.data[col].nunique()),
                'value_counts': value_counts.to_dict(),
                'most_frequent': value_counts.index[0] if len(value_counts) > 0 else None
            }
        
        return stats_report
    
    def create_visualizations(self):
        """Create comprehensive data visualizations"""
        n_numeric = len(self.numeric_columns)
        
        if n_numeric >= 2:
            fig = plt.figure(figsize=(16, 12))
            
            # 1. Correlation heatmap
            plt.subplot(2, 2, 1)
            correlation_matrix = self.data[self.numeric_columns].corr()
            sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0, fmt='.2f')
            plt.title('Correlation Matrix')
            
            # 2. Distribution plots for first 2 numeric columns
            for i, col in enumerate(self.numeric_columns[:2]):
                plt.subplot(2, 2, i + 2)
                self.data[col].hist(bins=30, alpha=0.7, color='skyblue', edgecolor='black')
                plt.title(f'Distribution of {col}')
                plt.xlabel(col)
                plt.ylabel('Frequency')
            
            # 3. Scatter plot between first 2 numeric columns
            plt.subplot(2, 2, 4)
            plt.scatter(self.data[self.numeric_columns[0]], 
                        self.data[self.numeric_columns[1]], 
                        alpha=0.6, color='green')
            plt.xlabel(self.numeric_columns[0])
            plt.ylabel(self.numeric_columns[1])
            plt.title(f'{self.numeric_columns[0]} vs {self.numeric_columns[1]}')
            
            plt.tight_layout()
            plt.savefig('data_analysis_plots.png', dpi=300, bbox_inches='tight')
            plt.close()
            return 'data_analysis_plots.png'
        
        else:
            print("⚠️ Not enough numeric columns for visualizations")
            return None
    
    def detect_outliers(self):
        """Detect outliers using IQR method"""
        outliers_report = {}
        
        for col in self.numeric_columns:
            series = self.data[col].dropna()
            if series.empty:
                continue
            
            Q1 = series.quantile(0.25)
            Q3 = series.quantile(0.75)
            IQR = Q3 - Q1
            
            if IQR == 0:  # avoid division by zero
                continue
            
            lower_bound = Q1 - 1.5 * IQR
            upper_bound = Q3 + 1.5 * IQR
            
            outliers = series[(series < lower_bound) | (series > upper_bound)]
            
            outliers_report[col] = {
                'count': int(len(outliers)),
                'percentage': round((len(outliers) / len(series)) * 100, 2),
                'lower_bound': float(lower_bound),
                'upper_bound': float(upper_bound)
            }
        
        return outliers_report
    
    def generate_insights(self):
        """Generate data insights and recommendations"""
        insights = {
            'data_quality': {},
            'recommendations': [],
            'patterns': []
        }
        
        # Missing data
        missing_percentage = (self.data.isnull().sum() / len(self.data)) * 100
        insights['data_quality']['missing_data'] = missing_percentage.round(2).to_dict()
        
        # Recommendations
        if any(missing_percentage > 10):
            insights['recommendations'].append("Handle missing values (>10% missing in some columns).")
        
        # Correlations
        if len(self.numeric_columns) > 1:
            correlation_matrix = self.data[self.numeric_columns].corr()
            high_corr_pairs = []
            for i in range(len(correlation_matrix.columns)):
                for j in range(i+1, len(correlation_matrix.columns)):
                    corr_val = correlation_matrix.iloc[i, j]
                    if abs(corr_val) > 0.8:
                        high_corr_pairs.append({
                            'feature1': correlation_matrix.columns[i],
                            'feature2': correlation_matrix.columns[j],
                            'correlation': float(corr_val)
                        })
            
            if high_corr_pairs:
                insights['patterns'].append({'type': 'high_correlation', 'pairs': high_corr_pairs})
                insights['recommendations'].append("Consider feature selection due to high correlation.")
        
        # Outliers
        outliers_report = self.detect_outliers()
        high_outlier_features = [col for col, info in outliers_report.items() if info['percentage'] > 5]
        
        if high_outlier_features:
            insights['patterns'].append({'type': 'outliers', 'features': high_outlier_features})
            insights['recommendations'].append("Consider treating outliers (>5% detected).")
        
        return insights

def main():
    if len(sys.argv) < 2:
        print("Usage: python data_processor.py <csv_file_path>")
        return
    
    file_path = sys.argv[1]
    
    processor = DataProcessor()
    
    if not processor.load_data(file_path):
        return
    
    print("\n=== Generating Statistics ===")
    stats = processor.generate_statistics()
    
    print("\n=== Creating Visualizations ===")
    viz_file = processor.create_visualizations()
    
    print("\n=== Detecting Outliers ===")
    outliers = processor.detect_outliers()
    
    print("\n=== Generating Insights ===")
    insights = processor.generate_insights()
    
    full_report = {
        'statistics': stats,
        'outliers': outliers,
        'insights': insights
    }
    
    with open('data_analysis_report.json', 'w') as f:
        json.dump(full_report, f, indent=2)
    
    print("\n✅ Data analysis complete!")
    print("📄 Report saved to: data_analysis_report.json")
    if viz_file:
        print(f"📊 Visualizations saved to: {viz_file}")
    
    print("\n=== SUMMARY ===")
    print(f"Dataset shape: {stats['basic_info']['shape']}")
    print(f"Numeric features: {len(stats['basic_info']['numeric_columns'])}")
    print(f"Categorical features: {len(stats['basic_info']['categorical_columns'])}")
    print(f"Missing values: {sum(stats['basic_info']['missing_values'].values())}")

if __name__ == "__main__":
    main()
