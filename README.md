# ICT2101-2201-Project

## Lab Group P5-2
Groups Members
1. Eddie Tan DeJun (2002226) EddieTanDJ
2. Chow Wen Jun (2000530) Lyc4on
3. Chua Xue Ning Joey (2002230) 170joeychua
4. Ong Jia Yan, Celeste (2001882) potatopootie
5. Foo Yong Jian Daniel (2000864) DanielFYJ

## Install Python Venv and the Python Libs
1. Clone the repository
2. Open terminal in the cloned repository and run the script below
```sh
pip3 install virtualenv
cd src
python -m venv venv-win
venv-win\Scripts\Activate
pip install -r requirements.txt
```
## Start the Web Server
```sh
start_server.bat
```
## Whitebox Testing
1. install and initialize npm
```sh
npm install --save-dev jest
npm init -y
```
2. Change to "test": "jest" in package.json file.
3. run the test
```sh
npm run test  
```