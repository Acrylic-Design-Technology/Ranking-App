FROM python:3

# Allow statements and log messages to immediately appear in the Knative logs
ENV PYTHONUNBUFFERED True

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

# Install production dependencies.
RUN pip install -r requirements.txt
RUN apt-get autoclean

WORKDIR $APP_HOME
CMD exec uvicorn main:app --host 0.0.0.0 --port $PORT --timeout-keep-alive 0 
