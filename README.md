# create-f2e-app
f2e-server 创建的前后端同构项目脚手架

## bootstrap
```
mkdir app && cd app && curl -o origin.zip http://atlassian.flowpp.cn/bitbucket/rest/api/latest/projects/FLOWMISC/repos/create-f2e-app/archive?format=zip && unzip origin.zip && rm -rf origin.zip
```

## dev
支持 webpack / esbuild 编译
```sh
npm i
npm run dev
```

## build
```sh
sh ./sh/build.sh
scp ./output.tar.gz work@my-vps:~/apps
```

## skills
- react & antd
- react-router
- echarts
- ipreact-for-react (like react-redux)
- typescript
- f2e-server