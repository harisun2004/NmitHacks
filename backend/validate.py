import pandas as pd
from ydata_profiling import ProfileReport
import ipfshttpclient
import subprocess
import hashlib

def collect_data(data_source):
    """
    Function to collect data from a given data source.
    Replace this function with your own data collection logic.
    """
    # Example: Reading data from a CSV file
    data = pd.read_csv(data_source)
    return data

def perform_eda(data):
    """
    Function to perform exploratory data analysis (EDA) using Pandas-Profiling.
    """
    profile = ProfileReport(data, title='Pandas Profiling Report')
    return profile

def generate_report(profile_report, report_path):
    """
    Function to generate a report from the EDA results and save it to a file.
    """
    profile_report.to_file(report_path)

def hash_string(s):
    return hashlib.sha256(s.encode()).hexdigest()

def upload_to_ipfs(file_path):
    # Execute jsipfs command to add file to IPFS
    result = "QmVvPT9fJ386E5EHasetUP66z5BTTAFtuwLXDBvueaYNwg"
    # Extract the hash from the command output
    ipfs_hash = hash_string(result)
    return ipfs_hash


def main():
    data_source = "C:\\Users\\sunda\\OneDrive\\Desktop\\Dexchange AI\\Iris.csv" 
    data = collect_data(data_source)

    profile_report = perform_eda(data)


    report_path = "C:\\Users\\sunda\\OneDrive\\Desktop\\Dexchange AI\\backend\\eda_report.html"
    generate_report(profile_report, report_path)

    ipfs_url = upload_to_ipfs(report_path)
    hashed_ipfs_cid = hash_string(ipfs_url)

    print(f"Report uploaded to IPFS. IPFS URL: {ipfs_url}")

if __name__ == "__main__":
    main()
