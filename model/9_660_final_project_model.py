#################################
### 9.660 FINAL PROJECT MODEL ###
#################################

# Course: 9.660
# Date: 2024-12-16
# Name: Inori Kawauchiya

import os
import numpy as np
from scipy.stats import norm
import pandas as pd

def bayesian_interval_posterior(observation, mu_prior=600.0, sigma_prior=20.0, sigma_sensory=10.0):
    """
    Compute posterior distribution parameters from single observation.
    sigma_prior set to 20.0 to keep prior around the standard interval value, 600 ms. 
    sigma_sensory set to 10.0 to add a little bit of noise. 
    """
    precision_prior = 1.0 / (sigma_prior ** 2)
    precision_sensory = 1.0 / (sigma_sensory ** 2)

    posterior_mean = (mu_prior * precision_prior + observation * precision_sensory) / (precision_prior + precision_sensory)
    posterior_var = 1.0 / (precision_prior + precision_sensory)
    posterior_std = np.sqrt(posterior_var)
    return posterior_mean, posterior_std

def generate_observation(true_interval, pitch_condition, delta_asc=5.0, delta_desc=5.0, sigma_sensory=10.0):
    """
    Preprocessing step to add pitch bias to the true interval based on pitch condition.
    If the pitch is ascending, the model will tend to underestimate the interval by 5 ms.
    if the pitch is descending, the model will tend to overestimate the interval by 5 ms.
    """
    if pitch_condition == 'H':  # ascending pitch -> participants tend to underestimate
        shifted_mean = true_interval - delta_asc
    elif pitch_condition == 'L':  # descending pitch -> participants tend to overestimate
        shifted_mean = true_interval + delta_desc
    else:  # 'S' same pitch condition, no pitch bias
        shifted_mean = true_interval

    observation = np.random.normal(shifted_mean, sigma_sensory)
    return observation

def decide_longer_shorter_equal(posterior_mean_test, posterior_mean_standard, threshold=30.0):
    """
    Added a threshold of 30 ms to bias the model in choosing 'equal' responses, 
        as the experimental dataset suggests this.
    """
    diff = posterior_mean_test - posterior_mean_standard
    if diff > threshold:
        return "longer"
    elif diff < -threshold:
        return "shorter"
    else:
        return "equal"

data = pd.read_csv("trials.csv")

results = []
for _, row in data.iterrows():
    question_id = row['question_id']
    pitch_condition = question_id[0]  # H, S, or L for high, same, low pitch
    interval_label = question_id[1]   # S, M, L for short, medium, long interval
    if interval_label == 'S':
        test_interval = 540
    elif interval_label == 'M':
        test_interval = 600
    else:
        test_interval = 660

    standard_observation = np.random.normal(600, 10.0)
    std_mean, std_std = bayesian_interval_posterior(standard_observation)
    test_observation = generate_observation(test_interval, pitch_condition)
    test_mean, test_std = bayesian_interval_posterior(test_observation)
    model_response = decide_longer_shorter_equal(test_mean, std_mean)

    results.append({
        'experiment_id': row['experiment_id'],
        'trial_number': row['trial_number'],
        'question_id': question_id,
        'human_response': row['response'],
        'model_response': model_response
    })

model_results = pd.DataFrame(results)
if not os.path.exists("model_comparisons.csv"):
    model_results.to_csv("model_comparisons.csv", index=False)
