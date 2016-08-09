from django.shortcuts import render

import time


def index(request):
    now = int(time.time())
    data = {
        'now': now
    }
    return render(request, 'index.html', data)
