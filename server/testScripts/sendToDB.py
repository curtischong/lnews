from influxdb import InfluxDBClient
from config import getConfig, getDBIP

config = getConfig()

DBIP = config['DB']['port']
DBUser = config['DB']['user']
DBPassword = config['DB']['password']
DBName = config['DB']['DBName']

client = InfluxDBClient(getDBIP(config), DBIP, DBUser, DBPassword, DBName)
result = client.query('select * from next_cards;')

