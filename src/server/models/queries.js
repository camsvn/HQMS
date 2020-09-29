const queryOP = `SELECT [ID] AS id
,[OPRegisterID] AS opId
,[DateTime] AS dateTime
,[DoctorID] AS docID
,[Deleted] AS isDeleted
,[IsConsulted] AS isConsulted
FROM [HospitalMain].[dbo].[OPVisit]
WHERE DateTime > CONVERT(varchar,GETDATE(),112) AND DateTime<GETDATE()
ORDER BY ID DESC`;

const queryDoc = `SELECT DISTINCT op.DoctorID AS id, doc.Name AS name
FROM [HospitalMain].[dbo].[OPVisit] op
INNER JOIN HospitalMain.dbo.Doctor doc
ON op.DoctorID = doc.ID
WHERE DateTime > CONVERT(varchar,GETDATE(),112) AND DateTime<GETDATE()`;

const getDoc = `SELECT DISTINCT op.DoctorID AS doctorID, doc.Name AS docName
FROM [HospitalMain].[dbo].[AppointmentBooking] op
INNER JOIN HospitalMain.dbo.Doctor doc
ON op.DoctorID = doc.ID
WHERE Date = CAST(GETDATE() AS DATE)
ORDER BY docName`;

const getUniqueDoc = `SELECT DISTINCT op.DoctorID AS doctorID, doc.Name AS docName
FROM [HospitalMain].[dbo].[AppointmentBooking] op
INNER JOIN HospitalMain.dbo.Doctor doc
ON op.DoctorID = doc.ID
WHERE Date = CAST(GETDATE() AS DATE) AND DoctorID NOT IN (
SELECT DISTINCT Token.doctorID 
FROM [HospitalMain].[dbo].[Token]
WHERE Date = CAST(GETDATE() AS DATE))
ORDER BY docName`;

const getUniqueDoc1 = `SELECT DISTINCT op.DoctorID AS doctorID, doc.Name AS docName
FROM [HospitalMain].[dbo].[AppointmentBooking] op
INNER JOIN HospitalMain.dbo.Doctor doc
ON op.DoctorID = doc.ID
WHERE Date = CAST(GETDATE() AS DATE) AND DoctorID NOT IN (SELECT DISTINCT Token.doctorID FROM Token)
ORDER BY docName`;

const ltestResult = `SELECT     TOP (12) LabTestReportMaster.Patient, OPRegister.OPNo 
FROM   LabTestReportMaster LEFT OUTER JOIN   OPRegister 
ON LabTestReportMaster.OPRegisterID = OPRegister.ID ORDER BY LabTestReportMaster.ID DESC`;

module.exports = { queryOP, queryDoc, getDoc, getUniqueDoc, ltestResult };
