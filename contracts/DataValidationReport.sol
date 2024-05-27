// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataValidationReport {
    struct Report {
        string datasetName;
        string reportHash;
        string urlHash;
        string version;
        string owner;
        string license;
        uint timestamp;
    }

    mapping(string => Report) private reports;

    event ReportStored(
        string indexed reportId,
        string datasetName,
        string reportHash,
        string urlHash,
        string version,
        string owner,
        string license,
        uint timestamp
    );

    function storeReport(
        string memory _reportId,
        string memory _datasetName,
        string memory _reportHash,
        string memory _urlHash,
        string memory _version,
        string memory _owner,
        string memory _license
    ) public {
        require(bytes(_reportId).length > 0, "Report ID is required");
        require(bytes(_reportHash).length > 0, "Report hash is required");

        Report memory newReport = Report({
            datasetName: _datasetName,
            reportHash: _reportHash,
            urlHash: _urlHash,
            version: _version,
            owner: _owner,
            license: _license,
            timestamp: block.timestamp
        });

        reports[_reportId] = newReport;

        emit ReportStored(_reportId, _datasetName, _reportHash, _urlHash, _version, _owner, _license, block.timestamp);
    }

    function getReport(string memory _reportId) public view returns (
        string memory datasetName,
        string memory reportHash,
        string memory urlHash,
        string memory version,
        string memory owner,
        string memory license,
        uint timestamp
    ) {
        Report memory report = reports[_reportId];
        return (
            report.datasetName,
            report.reportHash,
            report.urlHash,
            report.version,
            report.owner,
            report.license,
            report.timestamp
        );
    }
}
