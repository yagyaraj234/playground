#include<iostream>
using namespace std;

void RightAngleTriangePattern(){

    for(int i=0;i<5;i++){
        for(int j=0;j<i+1;j++){
            cout<<" * ";
        }
        cout<<endl;
    }
}

int main(){
    RightAngleTriangePattern();
    return 0;
}