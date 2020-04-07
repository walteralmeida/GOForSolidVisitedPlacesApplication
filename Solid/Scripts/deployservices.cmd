:: Deploy Services Script
:: Parameter 1 : ROOT_FOLDER (default value = [Drive]:\Projects)

SET ROOT_FOLDER=%1
IF "%ROOT_FOLDER%"=="" SET ROOT_FOLDER=%~d0\Projects
SET INETPATH=C:\inetpub\wwwroot\GenerativeObjectsApplications\Solid
SET SOURCEPATH=%ROOT_FOLDER%\GOForSolid\Solid\GeneratedCode

IF EXIST "%INETPATH%" GOTO APPFOLDEREXISTS
MKDIR "%INETPATH%"
:APPFOLDEREXISTS
IF EXIST "%INETPATH%\Bin" GOTO BINFOLDEREXISTS
MKDIR "%INETPATH%\Bin"
:BINFOLDEREXISTS	

robocopy "%SOURCEPATH%\ServiceLayer"           "%INETPATH%"     global.asax /S /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATH%\ServiceLayer\bin\debug" "%INETPATH%"     web.config  /S /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATH%\ServiceLayer\bin\debug" "%INETPATH%"     NLog.config /S /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATH%\ServiceLayer\bin\debug" "%INETPATH%\bin" *.dll	    /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATH%\ServiceLayer\bin\debug" "%INETPATH%\bin" *.pdb	    /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL

:: Copy db.config only if doesn't exist at target location
robocopy "%SOURCEPATH%\ServiceLayer\bin\debug" "%INETPATH%"     db.config  /S /R:5 /W:2 /NFL /NDL /xc /xn /xo

EXIT /B ERRORLEVEL