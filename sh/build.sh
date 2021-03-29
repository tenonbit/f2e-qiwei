dir=$(dirname $0)
cd $dir && cd ..

comment_tag="nothing to commit, working tree clean"
result=$(git status | grep 'nothing to commit, working tree clean')
#判断是否有代码没有提交，方便记录版本信息
if [ "$result" != "$comment_tag" ];
then
	echo 'There is also uncommitted code that is packaged after it is committed'
	exit 0
fi

rm -rf lib
rm -rf output
rm -rf ./*.tar.gz
# 判断asserts中是否有chrome压缩包，没有则下载
if [ ! -f "./asserts/Chrome.zip" ];
then
	curl -o ./asserts/Chrome.zip  http://172.16.0.191/softs/Chrome.zip
fi

npm run build

buildTime=$(date "+%Y-%m-%d %H:%M:%S")
echo "BuildTime：${buildTime}" >> ./output/version
echo "creator：`git config user.name`" >> ./output/version
echo "email：`git config user.email`" >> ./output/version
echo "gitBranch：`git branch | awk '/\*/ { print $2; }'`" >> ./output/version
echo "commitId：`git rev-parse HEAD`" >> ./output/version

cp -rf ./lib ./output/
cp package.json ./output/
cp package-lock.json ./output/
cp .npmrc ./output/
cp .f2econfig.prod.js ./output/.f2econfig.js
#cp ./sh/stop.sh ./output/
#cp ./sh/start.sh ./output/
#tar -xzf ./node_modules/@env/node/node.tar.gz -C ./output/

echo 'require("f2e-server")({})' > ./output/start.js
cd output && npm install --production && tar -zcvf ../output.tar.gz * .[!.]* && cd ..
