FROM python:3.12-slim-bookworm
# slim=debian-based. Not using alpine because it has poor python3 support.

# Set pip to have cleaner logs
ENV PYTHONUNBUFFERED=1 \
    PIPENV_NOSPIN=1

ENV TZ=Europe/Paris

# Install uv package manager
RUN pip install --no-cache-dir -U uv

WORKDIR /backend

# Copy the packages list
COPY pyproject.toml ./

# Install the dependencies
ENV UV_PROJECT_ENVIRONMENT="/usr/local/"

RUN uv lock && \
    uv sync --no-dev --locked

# Copy the source code into the image
COPY . .
