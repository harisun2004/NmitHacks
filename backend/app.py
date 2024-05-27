from flask import Flask, render_template, request, flash, redirect, url_for,send_file
import os
import subprocess
import hashlib
import ipfshttpclient
#from google.cloud import storage
import json
import requests
#import helia

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Google Cloud Storage configuration
#bucket_name = "your_bucket_name"

def upload_to_gcs(local_file_path, remote_file_name):
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(remote_file_name)
    blob.upload_from_filename(local_file_path)
    return f"https://storage.googleapis.com/{bucket_name}/{remote_file_name}"

def validate_dataset(file_path):
    result = subprocess.run(['python', 'validate.py', file_path], capture_output=True, text=True)
    if result.returncode != 0:
        raise Exception(f"Validation failed: {result.stderr}")
    return 'eda_report.html'
    return 'hashed_ipfs_cid'


def hash_string(s):
    return hashlib.sha256(s.encode()).hexdigest()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload_dataset', methods=['POST'])
def upload_dataset():
    owner_name = request.form['ownerName']
    smart_chain_address = request.form['smartChainAddress']
    dataset_name = request.form['datasetName']
    version = request.form['version']
    license_terms = request.form['licenseTerms']
    dataset_file = request.files['datasetFile']

    if not os.path.exists('uploads'):
        os.makedirs('uploads')

    dataset_path = os.path.join('uploads', dataset_file.filename)
    dataset_file.save(dataset_path)

    try:
        # Step 3: Perform Data Validation
        validation_report = validate_dataset(dataset_path)
        if not validation_report:
            return "Error: The validation report was not generated.", 500


        # Step 5: Upload Dataset to GCS and get URL
        gcs_url =  'https://example.com/dataset'
        ipfs_cid = "QmVvPT9fJ386E5EHasetUP66z5BTTAFtuwLXDBvueaYNwg"
        # Step 6: Hash IPFS CID and GCS URL
        hashed_ipfs_cid = hash_string(ipfs_cid)
        hashed_gcs_url = hash_string(gcs_url)

        # Step 7: Interact with the Smart Contract
        # Node.js interaction script call
        node_script = 'node_interact_contract.js'
        report_id = str(int(os.urandom(2).hex(), 16))  # Generate a random report ID

        # Call Node.js script with necessary arguments
        subprocess.run([
            'node', node_script,
            report_id, dataset_name, hashed_ipfs_cid, hashed_gcs_url, version, owner_name, license_terms, smart_chain_address
        ])

        flash("Dataset uploaded and report stored successfully!", "success")
        if os.path.exists('eda_report.html'):
            return send_file('eda_report.html', as_attachment=True, download_name='validation_report.html')
        else:
            return "Error: The validation report was not generated.", 500
    except Exception as e:
        flash(str(e), "error")
    
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)
