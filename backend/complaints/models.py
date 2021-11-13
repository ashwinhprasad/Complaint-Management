from django.db import models


# Create your models here.
class ComplaintModel(models.Model):

    mask_helmet_choices = [
        ('mask','Mask'),
        ('helmet','Helmet')
    ]

    title = models.CharField(max_length=100)
    is_mask_helmet = models.CharField(choices=mask_helmet_choices,max_length=6)
    photo = models.ImageField(upload_to='uploads/')

    def __str__(self):
        return f"{self.id} - {self.title}"
