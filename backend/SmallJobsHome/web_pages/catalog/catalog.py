# SmallJobsHome/web_pages/catalog/catalog.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

CATALOG_ITEMS = [
    {'id': 1, 'name': 'Hangout', 'description': 'An indoor picnic (or date) so you can compete who draws a better car, with video, mic, chat and loads of other functionalities. We provide you the perfect place to get together and have fun (without having to touch grass)', 'react_route': 'hangout/home'},
    {'id': 2, 'name': 'Hangout', 'description': 'An indoor picnic (or date) so you can compete who draws a better car, with video, mic, chat and loads of other functionalities. We provide you the perfect place to get together and have fun (without having to touch grass)'},
    {'id': 3, 'name': 'Hangout', 'description': 'An indoor picnic (or date) so you can compete who draws a better car, with video, mic, chat and loads of other functionalities. We provide you the perfect place to get together and have fun (without having to touch grass)'},
    {'id': 4, 'name': 'Hangout', 'description': 'An indoor picnic (or date) so you can compete who draws a better car, with video, mic, chat and loads of other functionalities. We provide you the perfect place to get together and have fun (without having to touch grass)'},
    {'id': 5, 'name': 'Hangout', 'description': 'An indoor picnic (or date) so you can compete who draws a better car, with video, mic, chat and loads of other functionalities. We provide you the perfect place to get together and have fun (without having to touch grass)'},
    {'id': 6, 'name': 'Hangout', 'description': 'An indoor picnic (or date) so you can compete who draws a better car, with video, mic, chat and loads of other functionalities. We provide you the perfect place to get together and have fun (without having to touch grass)'},
    {'id': 7, 'name': 'Hangout', 'description': 'An indoor picnic (or date) so you can compete who draws a better car, with video, mic, chat and loads of other functionalities. We provide you the perfect place to get together and have fun (without having to touch grass)'},
    {'id': 9, 'name': 'Hangout', 'description': 'An indoor picnic (or date) so you can compete who draws a better car, with video, mic, chat and loads of other functionalities. We provide you the perfect place to get together and have fun (without having to touch grass)'},
    {'id': 10, 'name': 'Hangout', 'description': 'An indoor picnic (or date) so you can compete who draws a better car, with video, mic, chat and loads of other functionalities. We provide you the perfect place to get together and have fun (without having to touch grass)'},
    {'id': 11, 'name': 'Hangout', 'description': 'An indoor picnic (or date) so you can compete who draws a better car, with video, mic, chat and loads of other functionalities. We provide you the perfect place to get together and have fun (without having to touch grass)'},
    {'id': 12, 'name': 'Hangout', 'description': 'An indoor picnic (or date) so you can compete who draws a better car, with video, mic, chat and loads of other functionalities. We provide you the perfect place to get together and have fun (without having to touch grass)'}
]

@csrf_exempt
def catalog_view(request):
    return JsonResponse(CATALOG_ITEMS, safe=False)
