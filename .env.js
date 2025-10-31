from prometheus_client import start_http_server, Gauge
from proxmoxer import ProxmoxAPI
import time

PROXMOX_HOST = '192.168.179.130:8006'   # <--- IP của node hiện tại
USER = 'root'
PASSWORD = 'vi0344708758'

proxmox = ProxmoxAPI(PROXMOX_HOST, user=USER, password=PASSWORD, verify_ssl=False)

node_up = Gauge('proxmox_node_up', 'Node status', ['node'])

def update_metrics():
    for node in proxmox.nodes.get():
        status = 1 if node['status'] == 'online' else 0
        node_up.labels(node=node['node']).set(status)

if __name__ == "__main__":
    start_http_server(9110)
    while True:
        update_metrics()
        time.sleep(10)
