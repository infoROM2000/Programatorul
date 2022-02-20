FROM golang:alpine
RUN mkdir /build
ADD . /build
WORKDIR /build/main
RUN apk add git
RUN git clone https://github.com/infoROM2000/Programatorul.git
RUN go build -o main .
CMD ["/build/main/main"]