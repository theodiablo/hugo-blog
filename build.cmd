set HUGO_ENV=PROD

call gulp images
IF %ERRORLEVEL% NEQ 0 goto error

call hugo
IF %ERRORLEVEL% NEQ 0 goto error

call gulp build
IF %ERRORLEVEL% NEQ 0 goto error

aws s3 sync ./public/ s3://theodiablo-travel-blog/ --delete --acl public-read --size-only --cache-control max-age=86400 --content-encoding gzip
IF %ERRORLEVEL% NEQ 0 goto error

echo Build and publish Success!

pause

:error
echo Something Bad Happened.
pause