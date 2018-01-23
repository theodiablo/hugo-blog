set HUGO_ENV=PROD

call gulp images
IF %ERRORLEVEL% NEQ 0 pause

call hugo
IF %ERRORLEVEL% NEQ 0 pause

call gulp build
IF %ERRORLEVEL% NEQ 0 pause

aws s3 sync ./public/ s3://theodiablo-travel-blog/ --delete --acl public-read --size-only --cache-control max-age=86400
IF %ERRORLEVEL% NEQ 0 pause

echo Build and publish Success!

pause