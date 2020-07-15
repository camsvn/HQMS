const queryOP = `SELECT [ID] AS id
,[OPRegisterID] AS opId
,[DateTime] AS dateTime
,[DoctorID] AS docID
,[Deleted] AS isDeleted
,[IsConsulted] AS isConsulted
FROM [HospitalMain].[dbo].[OPVisit]
WHERE DateTime > CONVERT(varchar,GETDATE(),112) AND DateTime<GETDATE()
ORDER BY ID DESC`;

const queryDoc = `SELECT DISTINCT op.DoctorID AS docID, doc.Name AS name
FROM [HospitalMain].[dbo].[OPVisit] op
INNER JOIN HospitalMain.dbo.Doctor doc
ON op.DoctorID = doc.ID
WHERE DateTime > CONVERT(varchar,GETDATE(),112) AND DateTime<GETDATE()`;

module.exports = { queryOP, queryDoc };
