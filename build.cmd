set HUGO_ENV=PROD

hugo
IF %ERRORLEVEL% NEQ 0 goto error

gulp build
IF %ERRORLEVEL% NEQ 0 goto error

aws s3 sync ./public/ s3://theodiablo-travel-blog/ --delete --acl public-read
IF %ERRORLEVEL% NEQ 0 goto error

echo Build and publish Success!

pause

:error
echo Something Bad Happened.
pause