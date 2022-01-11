rm -rf public
cd ../frontend && npm run build
cp -r public ../app/
# mv ../app/public/index-deta.html ../app/public/index.html 