@echo off
set ip_address_string="IP Address"
set ip_address_string="IPv4 Address"
for /f "usebackq tokens=2 delims=:" %%f in (`ipconfig ^| findstr /c:%ip_address_string%`) do (
    set ip_address=%%f
    goto :START_SERVER
)


:START_SERVER
@echo on

if NOT DEFINED ip_address set ip_address="localhost"
if "%ip_address%"=="%f" set ip_address="localhost"
echo Your IP Address is: %%f

set HUGO_ENV=DEV


START firefox.exe -new-tab "%ip_address%:1313"

START chrome.exe /new-window "%ip_address%:1313"

start chrome 

hugo serve -D --disableFastRender --baseUrl %ip_address% --bind %ip_address%