export class BlobToUrlValueConverter {  
    toView(blob) {
        let imageUrl = URL.createObjectURL(blob);
        return imageUrl;
    }
}