rm -rf public
cd ../frontend && npm run build -- --environment PROD=true
cp -r public ../app/
cd ../app
deta deploy