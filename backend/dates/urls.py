from rest_framework import routers
from dates import views
from django.urls import path, include

router = routers.DefaultRouter()

#url para registrar citas
router.register(r'',views.DatesViewSet,'dates')

urlpatterns = [
   path('', include(router.urls)),
]