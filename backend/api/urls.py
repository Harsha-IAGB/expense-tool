from django.urls import path
from .views import CreateExpenseView

urlpatterns = [
    path('create-expense/', CreateExpenseView.as_view(), name='create-expense'),
]