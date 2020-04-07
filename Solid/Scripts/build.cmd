:: Build Script
:: Parameter 1 : ROOT_FOLDER (default value = [Drive]:\Projects)

:: disable MsBuild tasks cssCompress & jsCompress 
SET DISABLE_MINIMIFY=true

SET ROOT_FOLDER=%1
IF "%ROOT_FOLDER%"=="" SET ROOT_FOLDER=%~d0\Projects
SET MSBUILD_EXE=C:\Program Files (x86)\MSBuild\14.0\Bin\MsBuild.exe 

"%MSBUILD_EXE%" "%ROOT_FOLDER%\GOForSolid/Solid\Solid.sln" /m:%NUMBER_OF_PROCESSORS% /p:IsPackaging=True /p:Configuration=Debug /fileLogger /fileLoggerParameters:LogFile=log.txt;ErrorsOnly

EXIT ERRORLEVEL