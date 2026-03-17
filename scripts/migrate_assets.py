import os
import re
import cloudinary
import cloudinary.uploader
import dotenv

# Load .env
dotenv.load_dotenv(r'd:\Mohit_Portfolio\.env')

# Configuration
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_CLOUD_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET'),
    secure=True
)

FILES_TO_UPDATE = [
    r'd:\Mohit_Portfolio\data\projectData.ts',
    r'd:\Mohit_Portfolio\data\featuredProjectsData.ts'
]

PROJECTS_DIR = r'd:\Mohit_Portfolio\public\projects'

def upload_local_assets():
    mapping = {}
    if not os.path.exists(PROJECTS_DIR):
        print("Projects directory not found.")
        return mapping

    for filename in os.listdir(PROJECTS_DIR):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp', '.svg')):
            file_path = os.path.join(PROJECTS_DIR, filename)
            public_id = f"portfolio_projects/{os.path.splitext(filename)[0]}"
            print(f"Uploading {filename} to Cloudinary...")
            try:
                result = cloudinary.uploader.upload(file_path, public_id=public_id, overwrite=True)
                mapping[f"/projects/{filename}"] = result['secure_url']
                # Also handle variants if the data uses different formats
                mapping[filename] = result['secure_url']
                print(f"Success: {result['secure_url']}")
            except Exception as e:
                print(f"Failed to upload {filename}: {e}")
    return mapping

def fix_broken_and_migrate():
    # Mapping for known broken or specifically requested migrations
    # Based on audit: 
    # Nexus (feat-6) cover_feat-6.png is 404. We have Nexus.png locally.
    # Famms (proj-12) cover_proj-12.png is 404. We have Famms.webp locally.
    
    # The upload_local_assets will already cover Nexus.png and Famms.webp 
    # if we point the data to them.
    pass

def update_data_files(mapping):
    for file_path in FILES_TO_UPDATE:
        if not os.path.exists(file_path):
            continue
        
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Update local paths first
        for local_path, cdn_url in mapping.items():
            content = content.replace(f'"{local_path}"', f'"{cdn_url}"')
            content = content.replace(f"'{local_path}'", f"'{cdn_url}'")

        # Specific fixes for known broken 404s if they aren't caught by the local mapping
        # feat-6 cover_feat-6.png -> Nexus.png's CDN URL
        if "Nexus.png" in mapping:
            nexus_url = mapping["Nexus.png"]
            content = re.sub(r'https://res\.cloudinary\.com/dhjkbcdfm/image/upload/portfolio_projects/cover_feat-6\.png', nexus_url, content)
            # Also catch the one in projectData.ts without some parts of the path if varied
            content = re.sub(r'https://res\.cloudinary\.com/dhjkbcdfm/image/upload/[^/]+/portfolio_projects/cover_feat-6\.png', nexus_url, content)

        # proj-12 cover_proj-12.png -> Famms.webp's CDN URL
        if "Famms.webp" in mapping:
            famms_url = mapping["Famms.webp"]
            content = re.sub(r'https://res\.cloudinary\.com/dhjkbcdfm/image/upload/v\d+/portfolio_projects/cover_proj-12\.png', famms_url, content)
            content = re.sub(r'https://res\.cloudinary\.com/dhjkbcdfm/image/upload/portfolio_projects/cover_proj-12\.png', famms_url, content)

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file_path}")

def main():
    print("Starting migration...")
    mapping = upload_local_assets()
    update_data_files(mapping)
    print("Migration finished.")

if __name__ == "__main__":
    main()
