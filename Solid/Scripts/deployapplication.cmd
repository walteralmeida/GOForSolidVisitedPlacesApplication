*:: Deploy Web Application Script
:: Parameters 1 : -fromServer (= not interactive) 
::            2 : ROOT_FOLDER (default value = [Drive]:\Projects) 

:: if param 1 == '-fromServer' then ROOT_FOLDER = second param
:: else ROOT_FOLDER = first param  
ECHO.%1| FIND /I "-fromServer">Nul && ( 
  SET ROOT_FOLDER=%2
  SET PARAM_1=%1
) || (
  SET ROOT_FOLDER=%1
  SET PARAM_1=
)

IF "%ROOT_FOLDER%"=="" SET ROOT_FOLDER=%~d0\Projects
SET PARAM_2="-rootFolder=%ROOT_FOLDER%"

SET INETPATH=C:\inetpub\wwwroot\GenerativeObjectsApplications\Solid
SET SCRIPTSPATH=%ROOT_FOLDER%\GOForSolid\Solid\Scripts
SET SOURCEPATH=%ROOT_FOLDER%\GOForSolid\Solid\GeneratedCode
SET SOURCEPATHCUSTOM=%ROOT_FOLDER%\GOForSolid\Solid\CustomCode
SET SOURCEPATHWEBAPP=%ROOT_FOLDER%\GOForSolid\Solid\WebApp

IF EXIST "%INETPATH%" GOTO APPFOLDEREXISTS
MKDIR "%INETPATH%"
:APPFOLDEREXISTS
IF EXIST "%INETPATH%\Bin" GOTO BINFOLDEREXISTS
MKDIR "%INETPATH%\Bin"
:BINFOLDEREXISTS	

robocopy "%SOURCEPATH%\WebApplicationLayer"       "%INETPATH%" *.aspx /S /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATHCUSTOM%\WebApplicationLayer" "%INETPATH%" *.aspx /S /R:5 /W:2 /NFL /NDL

robocopy "%SOURCEPATH%\WebApplicationLayer"       "%INETPATH%" *.js /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATHCUSTOM%\WebApplicationLayer" "%INETPATH%" *.js /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL

robocopy "%SOURCEPATH%\WebApplicationLayer"       "%INETPATH%" *.css /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATHCUSTOM%\WebApplicationLayer" "%INETPATH%" *.css /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL

robocopy "%SOURCEPATH%\WebApplicationLayer"       "%INETPATH%" *.pem /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATHCUSTOM%\WebApplicationLayer" "%INETPATH%" *.pem /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL

robocopy "%SOURCEPATH%\WebApplicationLayer"       "%INETPATH%" *.ico /S /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATHCUSTOM%\WebApplicationLayer" "%INETPATH%" *.ico /S /R:5 /W:2 /NFL /NDL

robocopy "%SOURCEPATH%\WebApplicationLayer"       "%INETPATH%" *.png /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATHCUSTOM%\WebApplicationLayer" "%INETPATH%" *.png /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL

robocopy "%SOURCEPATH%\WebApplicationLayer"       "%INETPATH%" *.gif /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATHCUSTOM%\WebApplicationLayer" "%INETPATH%" *.gif /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL

robocopy "%SOURCEPATH%\WebApplicationLayer"       "%INETPATH%" *.jpg /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATHCUSTOM%\WebApplicationLayer" "%INETPATH%" *.jpg /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL

:: Constructing Views
"%ROOT_FOLDER%\GOForSolid\Solid\GeneratedCode\ConstructViews\bin\debug\Solid.ConstructViews.exe" %PARAM_1% %PARAM_2%
IF EXIST "%INETPATH%\ConstructedViews%" GOTO CONSTRUCTEDVIEWSFOLDEREXISTS
MKDIR "%INETPATH%\ConstructedViews%"
:CONSTRUCTEDVIEWSFOLDEREXISTS

robocopy "%SOURCEPATH%\WebApplicationLayer\ConstructedViews"		"%INETPATH%\ConstructedViews" *.html /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATH%\WebApplicationLayer\Membership"				"%INETPATH%\Membership" *.html /S /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATH%\WebApplicationLayer\Membership\Resources"   	"%INETPATH%\Membership\Resources" /E /R:5 /W:2 /NFL /NDL

robocopy "%SOURCEPATH%\WebApplicationLayer\bin\debug" "%INETPATH%\bin" *.dll /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATH%\WebApplicationLayer\bin\debug" "%INETPATH%\bin" *.pdb /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATH%\ApplicationLayer\bin\debug" "%INETPATH%\bin" *.dll /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATH%\ApplicationLayer\bin\debug" "%INETPATH%\bin" *.pdb /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL

:: Scheduled Task Power Shell Scripts
SET SCHEDULED_TASKS_PATH=%SCRIPTSPATH%\Scheduled
IF NOT EXIST "%SCHEDULED_TASKS_PATH%" GOTO SKIPSCHEDULEDTASKS
IF EXIST "%INETPATH%\Schedule" GOTO SCHEDULEFOLDEREXISTS
MKDIR "%INETPATH%\Schedule"
:SCHEDULEFOLDEREXISTS
robocopy "%SCHEDULED_TASKS_PATH%" "%INETPATH%\Schedule" *.* /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL /purge
:SKIPSCHEDULEDTASKS


::WebApp 
SET WebAppPATH=%SOURCEPATHWEBAPP%\dist
robocopy "%WebAppPATH%"		"%INETPATH%\WebApp" *.html /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%WebAppPATH%"		"%INETPATH%\WebApp" *.css /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%WebAppPATH%"		"%INETPATH%\WebApp" *.js /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%WebAppPATH%"		"%INETPATH%\WebApp" *.png /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%WebAppPATH%\fonts"		"%INETPATH%\WebApp\fonts" * /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL

EXIT /B ERRORLEVEL
