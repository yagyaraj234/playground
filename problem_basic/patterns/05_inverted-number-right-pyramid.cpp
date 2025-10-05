#include<iostream>
using namespace std;


void InvertedRightNumberPyramid(){

    for(int i=0;i<5;i++){
        for(int j=0;j<5-i;j++){
            cout<< j+1<<" ";
        }
        cout<<endl;
    }

}

int main(){

 InvertedRightNumberPyramid();
 return 0;

}