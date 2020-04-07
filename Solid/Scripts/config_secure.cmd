:: Encrypt / decrypt section 'securedProperties' in Web.config

@echo off

set GO_IIS_APPLICATIONS_DIR=C:\inetpub\wwwroot\GenerativeObjectsApplications
set GO_DIR=G:\Projects
set GO_CONFIG=GO-Configuration
set GO_CONFIG_DIR=%GO_DIR%\%GO_CONFIG%
set WORKING_DIR=%windir%\Microsoft.NET\Framework\v4.0.30319

set DEFAULT=empty
set SECTION=securedProperties
set PROJECT_NAME=Solid
set action=%1
set projectDir=%DEFAULT%
set environmentOrProject=%DEFAULT%
set identity=%DEFAULT%

::Feed inputs
IF "%action%"=="encrypt" (
	set projectDir=%PROJECT_NAME%
	IF "%2"=="prod" (
	    set environmentOrProject=%PROJECT_NAME%
	) ELSE (
	    set environmentOrProject=%2
	)
)
IF "%action%"=="decrypt" (
	set projectDir=%PROJECT_NAME%
)
IF "%action%"=="import" (
	set projectDir=%PROJECT_NAME%
	IF "%2"=="prod" (
	    set environmentOrProject=%PROJECT_NAME%
	) ELSE (
	    set environmentOrProject=%2
	)
)
IF "%action%"=="grant" (
	set environmentOrProject=%2
	set identity=%3
)

set current_dir=%cd%
set iis_project_dir=%GO_IIS_APPLICATIONS_DIR%\%projectDir%
set repo=git@git.generativeobjects.com:go-core/%GO_CONFIG%.git
set rsa_keys_file=%GO_CONFIG_DIR%\keys\%environmentOrProject%_GO_RSA_Keys.xml
set rsa_keys_container=%environmentOrProject%_GO_RSA_Keys

echo ---------------------------------------------------------------------------------------------------
echo Usages: Encrypt / Decrypt / Import / Grant encryption elements of your web.config
echo                                            section impacted %SECTION%
echo -------
echo         %0 {action} {environment} 
echo          - action = 1. encrypt  : %0 encrypt {ENV}
echo                                   in recette for H3C = %0 encrypt dev
echo                     2. decrypt  : %0 decrypt
echo                                   for CEA = %0 decrypt
echo                     3. import   : %0 import {ENV}
echo                                   in prod for Thalès = %0 import prod
echo                     4. grant    : %0 grant {ENV} {IDENTITY}
echo                                   in recette for CFF = %0 grant recette GO-XL\goroot
echo          - environment = dev, recette or prod
echo.

cd %WORKING_DIR%

IF "%action%"=="encrypt" (
    echo -- ENCRYPT RSA Keys for environment / project %environmentOrProject% --
    echo    command: aspnet_regiis -pef "%SECTION%" %iis_project_dir% -prov "%environmentOrProject%_GO_RSA_Provider"
    aspnet_regiis -pef "%SECTION%" %iis_project_dir% -prov "%environmentOrProject%_GO_RSA_Provider"
)
IF "%action%"=="decrypt" (
    echo -- DECRYPT RSA Keys for environment / project %environmentOrProject% --
    echo    command: aspnet_regiis -pdf "%SECTION%" %iis_project_dir%
    aspnet_regiis -pdf "%SECTION%" %iis_project_dir%
)
IF "%action%"=="import" (
    cd %GO_DIR%
    echo 1. Get keys from repo %repo%
    git clone %repo%
    
    cd %WORKING_DIR%
	echo 2. IMPORT RSA Keys %rsa_keys_file% for environment %environmentOrProject%
    echo    command: aspnet_regiis -pi "%rsa_keys_container%" "%rsa_keys_file%"
    aspnet_regiis -pi "%rsa_keys_container%" "%rsa_keys_file%"
    
    echo 3. Removing GO-Configuration directories (%GO_CONFIG_DIR%)
    rmdir /S /Q %GO_CONFIG_DIR%
)
IF "%action%"=="grant" (
    echo -- GRANT RSA Keys Container '%rsa_keys_container%' for ID %identity% --
    echo    command: aspnet_regiis -pa "%rsa_keys_container%" %identity%
    aspnet_regiis -pa "%rsa_keys_container%" %identity%
)

cd "%current_dir%"
echo.
echo END %action% Web.config in %iis_project_dir%
