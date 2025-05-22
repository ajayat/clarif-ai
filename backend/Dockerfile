FROM python:3.11-slim-buster
# slim=debian-based. Not using alpine because it has poor python3 support.

# Set pip to have cleaner logs
ENV PYTHONUNBUFFERED=1 \
    PIPENV_NOSPIN=1

ENV TZ=Europe/Paris

# Install Pipenv
RUN pip install --no-cache-dir -U pipenv

WORKDIR /backend

# Copy the packages list
COPY Pipfile* ./

# Install the dependencies
RUN pipenv lock \
    && pipenv install --clear --system

# Copy the source code into the image
COPY . .
