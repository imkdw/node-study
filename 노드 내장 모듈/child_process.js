// 노드에서는 다른 프로그램을 실행하고 싶거나 명령어를 수행하고 싶을때 사용하는게 child_process 모듈이다.
// 예를 들어 파이썬으로 제작된 프로그램을 실행시켜서 결과를 받을수 있다.
const exec = require('child_process').exec;

// cmd에서 dir을 입력한다. dir 명령어는 현재 디렉토리의 파일시스템 구조를 보여주는 명령어다.
// 리눅스OS 의 경우 ls 를 입력하면 dir과 동일한 결과를 얻을 수 있다.
const process = exec('dir');

process.stdout.on('data', data => console.log(data.toString()));
process.stderr.on('data', data => console.error(data.toString()));


// exec와 spawn의 차이점은 exec의 경우 쉘에서 명령어를 실행하지만 spawn은 새로운 프로세스를 띄우면서 실행한다.
const spawn = require('child_process').spawn;

// 
const process = spawn('python', ['test.py']);
process.stdout.on('data', data => console.log(data.toString()));
process.stderr.on('data', data => console.error(data.toString()));