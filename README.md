# BuTTer

## About

BuTTer is a solution that aims to overcome the shortcomings of Ethereum as the key blockchain powering the TradeTrust solution. BuTTer provides a web application front end that allows easy extraction of textual data from digital trade documents such as Bills of Lading or Cover Letters. Users then can drag and drop, and a JSON data file is then generated.

We also provide a modified version of the open-attestation CLI that allows users to interface with the Avalanche Fuji testnet. Users can deploy the document store smart contract to the Avalanche testnet and compare the performance with the existing Ethereum-based solution.

Together, BuTTer and the modified open-attestation CLI provide a handy framework for users to interface with the TradeTrust framework, while enjoying the convenience of optical character recognition instantly recognizing the contents of submitted documents and the speed, reliability and security of the Avalanche network. The other relevant repositories are listed beneath, along with their respective features.

For more in-depth analysis of our project, please see the [project description](https://docs.google.com/document/d/e/2PACX-1vSj3yjnSp50jqJr27PjAKXxeq8gYZORaC2wg6YqlIyVWHnnl52Qp444NI7pm-PsmnMmwoHL9tlhtCJc/pub) here.

## Components

### New code

* #### [Back-end with OCR (this repository)](https://github.com/marketsurf/butter-backend)

* #### [Front-end web application](https://github.com/marketsurf/butter-frontend-app)

### Forked from existing TradeTrust code, but modified

* #### [Modified open-attestation CLI with Avalanche testnet option](https://github.com/marketsurf/open-attestation-cli)

* #### [Modified TradeTrust website with reference to Avalanche testnet](https://github.com/marketsurf/ms-tradetrust-website)

* #### [Modified OpenAttestation Verify](https://github.com/marketsurf/ms-oa-verify)

* #### [Modified DNSProve](https://github.com/marketsurf/ms-dnsprove)

## The Team
* [Jared Song](https://jaredmarcsong.com) - OCR Development, Planning, Documents

* [Sebastian Yii](https://sebastianyii.com) - Blockchain, Front-End

* [Zhang Zeyu](https://zeyu2001.com) - DevOps, Video, Back-End
