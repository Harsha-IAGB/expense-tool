from django.db import models


class Expense(models.Model):
    date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    receipt = models.FileField(upload_to='receipts/')

    def __str__(self):
        return f"Expense on {self.date} - ${self.amount}"
