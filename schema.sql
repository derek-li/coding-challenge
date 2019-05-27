CREATE DATABASE Database;

DROP TABLE IF EXISTS TodoTable

CREATE TABLE TodoTable (
  ID INT,
  GroupName NVARCHAR(MAX),
  Task NVARCHAR(MAX),
  DependencyIDs NVARCHAR(MAX),
  CompletedAt DATE
)

SELECT BulkColumn
FROM OPENROWSET (BULK 'public/data.json', SINGLE_CLOB) as @json

INSERT INTO TodoTable (ID, GroupName, Task, DependencyIds, CompletedAt)
  SELECT * 
  FROM OPENJSON(@json)
  WITH (ID INT '$.id', GroupName NVARCHAR(MAX) '$.group', Task NVARCHAR(MAX) '$.task', 
       DependencyIds NVARCHAR(MAX) '$.dependencyIds' AS JSON , CompletedAt DATE '$.completedAt')

