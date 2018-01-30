set HUGO_ENV=PROD

rmdir /s /q public

call gulp pre-build
IF %ERRORLEVEL% NEQ 0 exit

call hugo
IF %ERRORLEVEL% NEQ 0 exit

call gulp build
IF %ERRORLEVEL% NEQ 0 exit

aws s3 sync ./public/ s3://theodiablo-travel-blog/ --delete --acl public-read --size-only --cache-control max-age=86400
IF %ERRORLEVEL% NEQ 0 exit

echo Build and publish Success!