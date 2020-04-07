
SET INETPATH=C:\Projects\GenerativeObjects\GO-Docker\Base\go-generated-app\GOGeneratedApp
SET SOURCEPATH=G:\Projects\GOForSolid/Solid\GeneratedCode
SET SOURCEPATHCUSTOM=G:\Projects\GOForSolid/Solid\CustomCode

RMDIR /s /q "%INETPATH%"

IF EXIST "%INETPATH%" GOTO APPFOLDEREXISTS
MKDIR "%INETPATH%"
:APPFOLDEREXISTS
IF EXIST "%INETPATH%\Bin" GOTO BINFOLDEREXISTS
MKDIR "%INETPATH%\Bin"
:BINFOLDEREXISTS	

robocopy "%SOURCEPATH%\WebApplicationLayer" "%INETPATH%" *.aspx /S /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATHCUSTOM%\WebApplicationLayer" "%INETPATH%" *.aspx /S /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATH%\WebApplicationLayer" "%INETPATH%" *.js /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATHCUSTOM%\WebApplicationLayer" "%INETPATH%" *.js /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATH%\WebApplicationLayer" "%INETPATH%" *.css /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATHCUSTOM%\WebApplicationLayer" "%INETPATH%" *.css /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL

robocopy "%SOURCEPATH%\WebApplicationLayer" "%INETPATH%" *.pem /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATHCUSTOM%\WebApplicationLayer" "%INETPATH%" *.pem /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATH%\WebApplicationLayer" "%INETPATH%" *.ico /S /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATHCUSTOM%\WebApplicationLayer" "%INETPATH%" *.ico /S /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATH%\WebApplicationLayer" "%INETPATH%" *.png /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATHCUSTOM%\WebApplicationLayer" "%INETPATH%" *.png /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATH%\WebApplicationLayer" "%INETPATH%" *.gif /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATHCUSTOM%\WebApplicationLayer" "%INETPATH%" *.gif /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATH%\WebApplicationLayer" "%INETPATH%" *.jpg /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATHCUSTOM%\WebApplicationLayer" "%INETPATH%" *.jpg /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL

REM Constructing Views
"G:\Projects\GOForSolid/Solid\GeneratedCode\ConstructViews\bin\debug\Solid.ConstructViews.exe" %1
IF EXIST "%INETPATH%\ConstructedViews%" GOTO CONSTRUCTEDVIEWSFOLDEREXISTS
MKDIR "%INETPATH%\ConstructedViews%"
:CONSTRUCTEDVIEWSFOLDEREXISTS

robocopy "%SOURCEPATH%\WebApplicationLayer\ConstructedViews" "%INETPATH%\ConstructedViews" *.html /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATH%\WebApplicationLayer\Membership" "%INETPATH%\Membership" *.html /S /R:5 /W:2 /NFL /NDL

robocopy "%SOURCEPATH%\WebApplicationLayer\bin\debug" "%INETPATH%\bin" *.dll /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATH%\WebApplicationLayer\bin\debug" "%INETPATH%\bin" *.pdb /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATH%\ApplicationLayer\bin\debug" "%INETPATH%\bin" *.dll /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATH%\ApplicationLayer\bin\debug" "%INETPATH%\bin" *.pdb /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL

REM Deploy Services Script

robocopy "%SOURCEPATH%\ServiceLayer" "%INETPATH%" global.asax /S /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATH%\ServiceLayer\bin\debug" "%INETPATH%" web.config /S /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATH%\ServiceLayer\bin\debug" "%INETPATH%\bin" *.dll	  /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL
robocopy "%SOURCEPATH%\ServiceLayer\bin\debug" "%INETPATH%\bin" *.pdb	  /S /MT:%NUMBER_OF_PROCESSORS% /R:5 /W:2 /NFL /NDL

EXIT ERRORLEVEL