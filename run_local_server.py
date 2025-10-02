#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Servidor local para desarrollo del sitio del laboratorio.

Uso:
    python run_local_server.py --dir RUTA_AL_SITIO --port 8080 --open
"""
import argparse, http.server, socketserver, webbrowser, os, sys

def main():
    p = argparse.ArgumentParser(description="Servidor local para el sitio (evita problemas de CORS).")
    p.add_argument("--dir", default=".", help="Directorio raíz del sitio (donde está index.html).")
    p.add_argument("--port", type=int, default=8080, help="Puerto (default: 8080).")
    p.add_argument("--open", action="store_true", help="Abrir el navegador automáticamente.")
    args = p.parse_args()

    web_dir = os.path.abspath(args.dir)
    if not os.path.isdir(web_dir):
        print(f"[ERROR] Directorio no existe: {web_dir}")
        sys.exit(1)

    os.chdir(web_dir)
    handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", args.port), handler) as httpd:
        url = f"http://localhost:{args.port}/"
        print(f"[INFO] Sirviendo {web_dir} en {url}")
        if args.open:
            try:
                webbrowser.open(url)
            except Exception as e:
                print(f"[WARN] No se pudo abrir el navegador: {e}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n[INFO] Servidor detenido.")

if __name__ == "__main__":
    main()
