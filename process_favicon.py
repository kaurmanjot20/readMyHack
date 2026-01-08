from PIL import Image, ImageDraw
import os

def create_favicon(input_path, output_path, size=(512, 512)):
    try:
        # Open source image
        source = Image.open(input_path).convert("RGBA")
        
        # Create base image (transparent)
        base = Image.new("RGBA", size, (0, 0, 0, 0))
        draw = ImageDraw.Draw(base)
        
        # Draw rounded white square
        # Radius: 20% of size is standard for iOS/macOS style icons approx
        radius = int(size[0] * 0.22)
        # Coordinates: 0,0 to width,height. 
        # Note: Pillow draws including the bounds? 
        # Usually it's better to be safe with standard xy
        rect_coords = [0, 0, size[0], size[1]]
        
        draw.rounded_rectangle(rect_coords, radius=radius, fill="white")
        
        # Resize source to fit inside with padding
        # Let's say we want the icon to be 70% of the container to have nice breathing room
        target_max_dim = int(size[0] * 0.70) 
        
        # Calculate new size preserving aspect ratio
        width_ratio = target_max_dim / source.width
        height_ratio = target_max_dim / source.height
        scale_factor = min(width_ratio, height_ratio)
        
        new_w = int(source.width * scale_factor)
        new_h = int(source.height * scale_factor)
            
        source_resized = source.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        # Center coordinates
        x = (size[0] - new_w) // 2
        y = (size[1] - new_h) // 2
        
        # Paste source onto base
        base.alpha_composite(source_resized, (x, y))
        
        base.save(output_path)
        print(f"Successfully created favicon at {output_path}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    create_favicon(
        r"c:\Users\kaurm\Code\mlh-hack\public\fav1.png", 
        r"c:\Users\kaurm\Code\mlh-hack\src\app\icon.png"
    )
