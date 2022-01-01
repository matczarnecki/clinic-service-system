FROM openjdk:11-jdk
COPY target/clinic-system-0.0.1-SNAPSHOT.jar clinic-system-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/clinic-system-0.0.1-SNAPSHOT.jar"]