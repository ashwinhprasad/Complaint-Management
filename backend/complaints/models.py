from django.db import models


# Create your models here.
class ComplaintModel(models.Model):
    title = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='uploads/')

    def __str__(self):
        return f"{self.id} - {self.title}"
