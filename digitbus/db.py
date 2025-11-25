import pyodbc

def get_connection():
    server = 'localhost\MSSQLSERVER01'
    database = 'DigitBusProd'
    username = 'sa'
    password = '1234'

    connection_string = (
        f"DRIVER={{ODBC Driver 17 for SQL Server}};"
        f"SERVER={server};"
        f"DATABASE={database};"
        f"UID={username};"
        f"PWD={password};"
    )

    return pyodbc.connect(connection_string)
