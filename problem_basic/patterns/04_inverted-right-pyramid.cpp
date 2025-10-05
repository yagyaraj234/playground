#include<iostream>
using namespace std;


void InvertedRightPyramid(){

    for(int i=0;i<5;i++){


        for(int j=0;j<5-i;j++){
            cout<<" * ";
        }
        cout<<endl;
    }

}

int main(){

 InvertedRightPyramid();
 return 0;

}