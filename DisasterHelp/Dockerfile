FROM eclipse-temurin:17

WORKDIR /opt/disasterhelp

RUN useradd -u 1001 disasteruser
USER disasteruser

ENV SPRING_DATASOURCE_URL=jdbc:postgresql://postgres-db:5432/disasterdb \
    SPRING_DATASOURCE_USERNAME=postgres \
    SPRING_DATASOURCE_PASSWORD=postgres123 \
    SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.postgresql.Driver \
    SPRING_JPA_HIBERNATE_DDL_AUTO=create \
    SPRING_JPA_DATABASE_PLATFORM=org.hibernate.dialect.PostgreSQLDialect \
    APP_NAME=DisasterHelpAPI

COPY ./target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
