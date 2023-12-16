import os

def get_Base_details(request):
       return {
                'created_by': request.data["created_by"],
        }
    
def get_original_name(request):

        image = request.data["path"]
        if not image == '':
            filename  = image.name
            return os.path.splitext(filename)[0]
        return ""
    
def get_content_type(request):

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

def get_service_data_From_request_Object(request):
        requestObj = get_image_data_from_request(request)
        requestObj['feature_title'] = request.data["feature_title"]
        requestObj['feature_sub_title'] = request.data["feature_sub_title"]
        requestObj['feature_description'] = request.data["feature_description"]
        requestObj['serviceID'] = request.data["serviceID"]
        return requestObj
