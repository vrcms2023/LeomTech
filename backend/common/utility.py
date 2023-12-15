import os


    
def get_original_name(request):

        image = request.data["path"]
        if not image == '':
            filename  = image.name
            return os.path.splitext(filename)[0]
        return ""
    
def     get_content_type(request):

        image = request.data["path"]
        if not image == '':
            filename  = image.name
            return os.path.splitext(filename)[1]
        return ""

def get_image_data_from_request(request):

        return {
                'path': request.data["path"],
                'category': request.data["category"],
                'originalname': get_original_name(request),
                'contentType': get_content_type(request),
                'imageTitle': request.data["imageTitle"],
                'imageDescription': request.data["imageDescription"],
                'updated_by': request.data["updated_by"],
                'alternitivetext' : request.data["alternitivetext"]
        }


def get_banner_data_From_request_Object(request):
        requestObj = get_image_data_from_request(request)
        requestObj['pageType'] = request.data["pageType"]
        requestObj['bannerTitle'] = request.data["bannerTitle"]
        return requestObj

