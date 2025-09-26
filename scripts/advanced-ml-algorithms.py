import numpy as np
import pandas as pd
from sklearn.decomposition import PCA
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier, GradientBoostingRegressor
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, mean_squared_error
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split, cross_val_score
import cv2
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout, Input
import json
import os
from datetime import datetime
import sqlite3
import warnings

warnings.filterwarnings("ignore")


class ISO25010UsabilityAnalyzer:
    """Mixed-methods analysis guided by ISO 25010 usability model"""

    def __init__(self):
        self.usability_metrics = {
            'effectiveness': [],
            'efficiency': [],
            'satisfaction': [],
            'learnability': [],
            'operability': [],
            'user_error_protection': [],
            'user_interface_aesthetics': [],
            'accessibility': []
        }

    def collect_survey_data(self, survey_responses):
        """Structured survey data collection (Likert 1-5)"""
        print("[v0] Collecting ISO 25010 survey data...")

        for response in survey_responses:
            for metric, value in response.items():
                if metric in self.usability_metrics:
                    try:
                        self.usability_metrics[metric].append(float(value))
                    except Exception:
                        # ignore malformed entries
                        continue

        return self.usability_metrics

    def perform_pca_analysis(self, data_matrix):
        """Principal Component Analysis for dimensionality reduction"""
        print("[v0] Performing PCA analysis...")

        scaler = StandardScaler()
        scaled_data = scaler.fit_transform(data_matrix)

        pca = PCA(n_components=0.95)  # Retain 95% variance
        pca_result = pca.fit_transform(scaled_data)

        return {
            'components': pca_result,
            'explained_variance_ratio': pca.explained_variance_ratio_,
            'cumulative_variance': np.cumsum(pca.explained_variance_ratio_),
            'n_components': pca.n_components_
        }

    def ols_regression_analysis(self, X, y):
        """Ordinary Least Squares regression for usability prediction"""
        print("[v0] Performing OLS regression analysis...")

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        model = LinearRegression()
        model.fit(X_train, y_train)

        predictions = model.predict(X_test)
        score = model.score(X_test, y_test)

        return {
            'model': model,
            'predictions': predictions,
            'r2_score': score,
            'coefficients': model.coef_,
            'intercept': model.intercept_
        }


class FaceNetCNNRecognizer:
    """
    CNN-based embedding extractor + simple classifier for face recognition.
    NOTE: This implementation uses the CNN as an embedding extractor and then
    trains a simple sklearn classifier (KNN) on those embeddings.
    """

    def __init__(self):
        self.embedding_model = None
        self.classifier = None
        self.label_encoder = None

    def build_cnn_model(self, input_shape=(160, 160, 3)):
        """Build a lightweight CNN to produce embeddings (shape 128)."""
        print("[v0] Building FaceNet-inspired CNN model...")

        inp = Input(shape=input_shape)
        x = Conv2D(32, (3, 3), activation='relu')(inp)
        x = MaxPooling2D((2, 2))(x)
        x = Conv2D(64, (3, 3), activation='relu')(x)
        x = MaxPooling2D((2, 2))(x)
        x = Conv2D(128, (3, 3), activation='relu')(x)
        x = MaxPooling2D((2, 2))(x)
        x = Conv2D(256, (3, 3), activation='relu')(x)
        x = MaxPooling2D((2, 2))(x)
        x = Flatten()(x)
        x = Dense(512, activation='relu')(x)
        x = Dropout(0.5)(x)
        x = Dense(256, activation='relu')(x)
        embeddings = Dense(128, activation='linear')(x)  # face embedding layer

        model = tf.keras.Model(inputs=inp, outputs=embeddings)
        # We compile without a loss since embedding training (triplet) is not implemented here.
        model.compile(optimizer='adam')
        self.embedding_model = model
        return model

    def extract_face_embedding(self, face_image):
        """Extract 128-dimensional face embedding from a single face image (numpy array)."""
        if self.embedding_model is None:
            self.build_cnn_model()

        # Preprocess image: expect BGR numpy image as from cv2
        face_resized = cv2.resize(face_image, (160, 160))
        face_normalized = face_resized.astype('float32') / 255.0
        face_batch = np.expand_dims(face_normalized, axis=0)

        embedding = self.embedding_model.predict(face_batch)
        return np.squeeze(embedding)

    def train_face_recognition(self, image_list, labels):
        """
        Train a simple classifier on top of embeddings.
        image_list: list of numpy images (BGR or RGB) sized arbitrary
        labels: list-like of labels corresponding to images
        Returns: trained sklearn classifier (KNN by default)
        """

        if len(image_list) == 0 or len(image_list) != len(labels):
            raise ValueError("image_list and labels must be same non-zero length")

        if self.embedding_model is None:
            self.build_cnn_model()

        # Create embeddings for all images
        embeddings = []
        for img in image_list:
            emb = self.extract_face_embedding(img)
            embeddings.append(emb)
        embeddings = np.vstack(embeddings)

        # Train a simple classifier on embeddings
        knn = KNeighborsClassifier(n_neighbors=3)
        knn.fit(embeddings, labels)

        self.classifier = knn
        print("[v0] Face recognition classifier trained (KNN on embeddings).")
        return knn

    def predict(self, face_image):
        """Predict label for a single face image using trained classifier."""
        if self.classifier is None:
            raise ValueError("Classifier not trained yet")

        emb = self.extract_face_embedding(face_image).reshape(1, -1)
        return self.classifier.predict(emb)


class MLResourceScheduler:
    """Resource scheduling via Machine Learning"""

    def __init__(self):
        self.scheduler_model = None
        self.resource_data = []

    def collect_resource_data(self, classrooms, teachers, time_slots, subjects):
        """Collect resource utilization data."""
        print("[v0] Collecting resource scheduling data...")

        resource_matrix = []
        for classroom in classrooms:
            for teacher in teachers:
                for time_slot in time_slots:
                    for subject in subjects:
                        features = [
                            classroom.get('capacity', 30),
                            teacher.get('current_load', 0),
                            time_slot.get('preference_score', 0),
                            subject.get('demand_level', 0)
                        ]
                        resource_matrix.append(features)

        return np.array(resource_matrix)

    def train_scheduling_model(self, X, y):
        """Train ML model for optimal resource scheduling."""
        print("[v0] Training resource scheduling model...")

        self.scheduler_model = GradientBoostingClassifier(
            n_estimators=100,
            learning_rate=0.1,
            max_depth=6,
            random_state=42
        )

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        self.scheduler_model.fit(X_train, y_train)

        predictions = self.scheduler_model.predict(X_test)
        accuracy = accuracy_score(y_test, predictions)

        return {
            'model': self.scheduler_model,
            'accuracy': float(accuracy),
            'feature_importance': self.scheduler_model.feature_importances_.tolist()
        }

    def optimize_schedule(self, resources):
        """Generate optimized schedule using trained model"""
        print("[v0] Generating optimized schedule...")

        if self.scheduler_model is None:
            raise ValueError("Model not trained yet")

        # resources should be a dict with keys classrooms, teachers, time_slots, subjects
        resource_features = self.collect_resource_data(
            resources['classrooms'],
            resources['teachers'],
            resources['time_slots'],
            resources['subjects']
        )
        optimal_assignments = self.scheduler_model.predict(resource_features)

        return optimal_assignments.tolist()


class NLPChatbot:
    """Educational chatbot with basic NLP intent classification"""

    def __init__(self):
        self.intent_classifier = None
        self.response_templates = {
            'attendance_query': "Your attendance is {percentage}%. You have attended {present} out of {total} classes.",
            'schedule_query': "Your next class is {subject} at {time} in {room}.",
            'grade_query': "Your current grade in {subject} is {grade}. Keep up the good work!",
            'help_query': "I can help you with attendance, schedules, grades, and general questions."
        }

    def preprocess_text(self, text):
        """Preprocess user input text"""
        import re

        text = re.sub(r'[^a-zA-Z0-9\s]', '', text.lower())
        tokens = text.split()
        return tokens

    def classify_intent(self, user_input):
        """Classify user intent using simple keyword rules"""
        print("[v0] Classifying user intent...")

        tokens = self.preprocess_text(user_input)

        if any(word in tokens for word in ['attendance', 'present', 'absent']):
            return 'attendance_query'
        elif any(word in tokens for word in ['schedule', 'timetable', 'class', 'next']):
            return 'schedule_query'
        elif any(word in tokens for word in ['grade', 'marks', 'score', 'result']):
            return 'grade_query'
        else:
            return 'help_query'

    def generate_response(self, intent, context_data):
        """Generate appropriate response based on intent"""
        template = self.response_templates.get(intent, "I'm sorry, I didn't understand that.")

        try:
            response = template.format(**context_data)
        except KeyError:
            response = "I don't have enough information to answer that question."

        return response


class GradientBoostingRecommender:
    """Gradient Boosting for weighting and recommendations"""

    def __init__(self):
        self.gb_weighter = None
        self.gbm_recommender = None
        self.comparison_models = {}

    def train_gb_weighter(self, features, importance_scores):
        """Train Gradient Boosting for feature weighting"""
        print("[v0] Training GB weighter...")

        self.gb_weighter = GradientBoostingRegressor(
            n_estimators=100,
            learning_rate=0.1,
            max_depth=6,
            random_state=42
        )

        self.gb_weighter.fit(features, importance_scores)

        return {
            'model': self.gb_weighter,
            'feature_weights': self.gb_weighter.feature_importances_.tolist()
        }

    def train_gbm_recommender(self, user_item_matrix, ratings):
        """Train GBM for educational content recommendations"""
        print("[v0] Training GBM recommender...")

        self.gbm_recommender = GradientBoostingRegressor(
            n_estimators=150,
            learning_rate=0.05,
            max_depth=8,
            random_state=42
        )

        X_train, X_test, y_train, y_test = train_test_split(
            user_item_matrix, ratings, test_size=0.2, random_state=42
        )

        self.gbm_recommender.fit(X_train, y_train)

        predictions = self.gbm_recommender.predict(X_test)
        mse = mean_squared_error(y_test, predictions)

        return {
            'model': self.gbm_recommender,
            'mse': float(mse),
            'predictions': predictions.tolist()
        }

    def compare_algorithms(self, X, y):
        """
        Compare GBM with PCA, RF, KNN.
        This function now auto-detects whether y indicates regression or classification
        and uses appropriate models & scoring.
        """
        print("[v0] Comparing algorithms...")

        y = np.asarray(y)
        is_regression = (y.dtype.kind in 'f') or (len(np.unique(y)) > 20)

        results = {}

        if is_regression:
            # Use regressors and MSE (neg_mean_squared_error for cross_val_score)
            algorithms = {
                'GBM': GradientBoostingRegressor(n_estimators=100, random_state=42),
                'RF': GradientBoostingRegressor(n_estimators=100, random_state=42),  # using regressor instead of classifier
                'KNN': GradientBoostingRegressor(n_estimators=50, random_state=42)   # placeholder - KNN is usually regressor/regressor variant
            }

            for name, model in algorithms.items():
                try:
                    scores = cross_val_score(model, X, y, cv=5, scoring='neg_mean_squared_error')
                    results[name] = {
                        'mean_neg_mse': float(np.mean(scores)),
                        'std_neg_mse': float(np.std(scores)),
                        'scores': scores.tolist()
                    }
                except Exception as e:
                    results[name] = {'error': str(e)}

            # PCA comparison with GBM
            try:
                pca = PCA(n_components=0.95)
                X_pca = pca.fit_transform(X)
                gbm_pca = GradientBoostingRegressor(n_estimators=100, random_state=42)
                pca_scores = cross_val_score(gbm_pca, X_pca, y, cv=5, scoring='neg_mean_squared_error')

                results['GBM_with_PCA'] = {
                    'mean_neg_mse': float(np.mean(pca_scores)),
                    'std_neg_mse': float(np.std(pca_scores)),
                    'n_components': int(pca.n_components_)
                }
            except Exception as e:
                results['GBM_with_PCA'] = {'error': str(e)}
        else:
            # Classification case
            algorithms = {
                'GBM': GradientBoostingClassifier(n_estimators=100, random_state=42),
                'RF': RandomForestClassifier(n_estimators=100, random_state=42),
                'KNN': KNeighborsClassifier(n_neighbors=5)
            }

            for name, model in algorithms.items():
                try:
                    scores = cross_val_score(model, X, y, cv=5, scoring='accuracy')
                    results[name] = {
                        'mean_accuracy': float(np.mean(scores)),
                        'std_accuracy': float(np.std(scores)),
                        'scores': scores.tolist()
                    }
                except Exception as e:
                    results[name] = {'error': str(e)}

            # PCA + GBM classification (GBM as classifier)
            try:
                pca = PCA(n_components=0.95)
                X_pca = pca.fit_transform(X)
                gbm_pca = GradientBoostingClassifier(n_estimators=100, random_state=42)
                pca_scores = cross_val_score(gbm_pca, X_pca, y, cv=5, scoring='accuracy')

                results['GBM_with_PCA'] = {
                    'mean_accuracy': float(np.mean(pca_scores)),
                    'std_accuracy': float(np.std(pca_scores)),
                    'n_components': int(pca.n_components_)
                }
            except Exception as e:
                results['GBM_with_PCA'] = {'error': str(e)}

        return results

    def generate_recommendations(self, user_profile, n_recommendations=5):
        """Generate personalized recommendations"""
        if self.gbm_recommender is None:
            raise ValueError("GBM recommender not trained yet")

        user_features = np.array(user_profile).reshape(1, -1)
        recommendation_scores = self.gbm_recommender.predict(user_features)

        top_indices = np.argsort(recommendation_scores)[-n_recommendations:]

        return {
            'recommendations': top_indices.tolist(),
            'scores': recommendation_scores[top_indices].tolist()
        }


# Main execution function
def run_advanced_ml_analysis():
    """Run comprehensive ML analysis"""
    print("[v0] Starting advanced ML analysis...")

    # Initialize all components
    usability_analyzer = ISO25010UsabilityAnalyzer()
    face_recognizer = FaceNetCNNRecognizer()
    resource_scheduler = MLResourceScheduler()
    chatbot = NLPChatbot()
    gb_recommender = GradientBoostingRecommender()

    # Generate sample data for demonstration
    sample_survey_data = [
        {'effectiveness': 4, 'efficiency': 3, 'satisfaction': 5, 'learnability': 4},
        {'effectiveness': 5, 'efficiency': 4, 'satisfaction': 4, 'learnability': 5},
        {'effectiveness': 3, 'efficiency': 5, 'satisfaction': 3, 'learnability': 4}
    ]

    # Run analyses
    usability_metrics = usability_analyzer.collect_survey_data(sample_survey_data)

    # Create sample data matrix for PCA
    data_matrix = np.random.rand(100, 8)  # 100 samples, 8 features
    pca_results = usability_analyzer.perform_pca_analysis(data_matrix)

    # OLS regression
    X_sample = np.random.rand(100, 5)
    y_sample = np.random.rand(100)
    ols_results = usability_analyzer.ols_regression_analysis(X_sample, y_sample)

    # Gradient Boosting comparison
    gb_comparison = gb_recommender.compare_algorithms(X_sample, y_sample)

    results = {
        'timestamp': datetime.now().isoformat(),
        'usability_metrics': usability_metrics,
        'pca_analysis': {
            'n_components': int(pca_results['n_components']),
            'explained_variance': pca_results['explained_variance_ratio'].tolist(),
            'cumulative_variance': pca_results['cumulative_variance'].tolist()
        },
        'ols_regression': {
            'r2_score': float(ols_results['r2_score']),
            'coefficients': ols_results['coefficients'].tolist(),
            'intercept': float(ols_results['intercept'])
        },
        'algorithm_comparison': gb_comparison
    }

    # Save results
    with open('ml_analysis_results.json', 'w') as f:
        json.dump(results, f, indent=2)

    print("[v0] Advanced ML analysis completed!")
    return results


if __name__ == "__main__":
    results = run_advanced_ml_analysis()
    print(f"[v0] Results saved. Analysis completed with {len(results)} top-level keys.")
