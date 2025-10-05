#include<iostream>
using namespace std;

void RightAngleNumberPattern(){
    for(int idx=0;idx<5;idx++){

        for(int it=0;it<idx+1;it++){
            cout<<it+1 << " ";
        }

        cout<<endl;
    }
}


void RightAngleNumberPattern2(){
    for(int idx=0;idx<5;idx++){

        for(int it=0;it<idx+1;it++){
            cout<<idx+1 << " ";
        }

        cout<<endl;
    }
}


int main(){
    RightAngleNumberPattern();
    cout<<endl;
    RightAngleNumberPattern2();
    return 0;
}