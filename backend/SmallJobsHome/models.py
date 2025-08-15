from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class SmallJobsUserManager(BaseUserManager):
    def create_user(self, email, fullname, password=None, user_type='3', is_admin=False):
        if not email:
            raise ValueError("Users must have an email address")
        if not fullname:
            raise ValueError("Users must have a full name")

        user = self.model(
            email=self.normalize_email(email),
            fullname=fullname,
            user_type=user_type,
            is_admin=is_admin
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, fullname, password=None):
        return self.create_user(
            email=email,
            fullname=fullname,
            password=password,
            user_type='1',
            is_admin=True
        )


class SmallJobsUser(AbstractBaseUser):
    class UserTypes(models.TextChoices):
        SUPERUSER = '1', 'Superuser'
        ADMIN = '2', 'Admin'
        USER = '3', 'User'

    fullname = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    user_type = models.CharField(
        max_length=1,
        choices=UserTypes.choices,
        default=UserTypes.USER
    )

    objects = SmallJobsUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['fullname']

    def __str__(self):
        return self.email

    @property
    def is_superuser(self):
        if self.user_type == '1':
            return True
        return False
    @property
    def account_exists(self):
        return self.is_active

    @property
    def is_staff(self):
        return self.is_admin

    class Meta:
        db_table = 'Users'
