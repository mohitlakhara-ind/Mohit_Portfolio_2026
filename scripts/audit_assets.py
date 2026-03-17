import os
import re
import urllib.request
import urllib.error

# Files to scan
FILES_TO_SCAN = [
    r'd:\Mohit_Portfolio\data\projectData.ts',
    r'd:\Mohit_Portfolio\data\featuredProjectsData.ts'
]

# Regex to find coverImage URLs
IMAGE_REGEX = re.compile(r'"coverImage":\s*"([^"]+)"')

LOG_FILE = r'd:\Mohit_Portfolio\asset_audit.log'

def check_url(url):
    if url.startswith('/'):
        # Local path
        full_path = os.path.join(r'd:\Mohit_Portfolio\public', url.lstrip('/'))
        if os.path.exists(full_path):
            return "LOCAL (Found)"
        else:
            return "LOCAL (Missing)"
    
    try:
        req = urllib.request.Request(url, method='HEAD')
        # Add a User-Agent to avoid potential blocks
        req.add_header('User-Agent', 'Mozilla/5.0')
        with urllib.request.urlopen(req, timeout=5) as response:
            if response.status == 200:
                return "OK"
            else:
                return f"BROKEN ({response.status})"
    except urllib.error.HTTPError as e:
        return f"BROKEN ({e.code})"
    except Exception as e:
        return f"ERROR ({str(e)})"

def main():
    assets = []
    for file_path in FILES_TO_SCAN:
        if not os.path.exists(file_path):
            continue
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                matches = IMAGE_REGEX.findall(content)
                for url in matches:
                    assets.append((file_path, url))
        except Exception as e:
            print(f"Error reading {file_path}: {e}")

    # Remove duplicates
    assets = list(set(assets))
    
    with open(LOG_FILE, 'w', encoding='utf-8') as log:
        log.write("ASSET AUDIT LOG\n")
        log.write("===============\n\n")
        for file_path, url in assets:
            status = check_url(url)
            log.write(f"Source: {os.path.basename(file_path)}\n")
            log.write(f"URL: {url}\n")
            log.write(f"Status: {status}\n")
            
            # Action suggestion
            action = "None"
            if "LOCAL" in status:
                action = "Upload to Cloudinary"
            elif "BROKEN" in status:
                action = "Identify replacement and upload to Cloudinary"
            elif "githubusercontent.com" in url:
                action = "Migrate to Cloudinary"
            
            log.write(f"Action: {action}\n")
            log.write("-" * 20 + "\n")

    print(f"Audit complete. Log saved to {LOG_FILE}")

if __name__ == "__main__":
    main()
